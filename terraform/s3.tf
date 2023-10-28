variable "s3_referer" {}

resource "aws_s3_bucket" "nuxt_blog" {
  bucket = "nuxt3-blog-contents"
}

resource "aws_s3_bucket_acl" "default" {
  depends_on = [
    aws_s3_bucket_ownership_controls.default,
    aws_s3_bucket_public_access_block.public,
  ]

  bucket = aws_s3_bucket.nuxt_blog.id
}

resource "aws_s3_bucket_versioning" "disabled" {
  bucket = aws_s3_bucket.nuxt_blog.id
  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "default" {
  bucket = aws_s3_bucket.nuxt_blog.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_ownership_controls" "default" {
  bucket = aws_s3_bucket.nuxt_blog.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "public" {
  bucket                  = aws_s3_bucket.nuxt_blog.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

data "aws_iam_policy_document" "nuxt_blog" {
  statement {
    sid     = "PublicReadGetObject"
    effect  = "Allow"
    actions = ["s3:GetObject"]
    resources = [
      "arn:aws:s3:::${aws_s3_bucket.nuxt_blog.id}/*"
    ]

    principals {
      type        = "*"
      identifiers = ["*"]
    }

    condition {
      test     = "StringLike"
      variable = "aws:Referer"

      values = [
        var.s3_referer
      ]
    }
  }
}

resource "aws_s3_bucket_policy" "nuxt_blog" {
  bucket = aws_s3_bucket.nuxt_blog.id
  policy = data.aws_iam_policy_document.nuxt_blog.json
}

resource "aws_s3_bucket_website_configuration" "static" {
  bucket = aws_s3_bucket.nuxt_blog.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}
