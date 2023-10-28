variable "github_account" {}
variable "repository" {}

resource "aws_iam_openid_connect_provider" "github_actions" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["1c58a3a8518e8759bf075b76b750d4f2df264fcd"]
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github_actions.arn]
    }
    actions = ["sts:AssumeRoleWithWebIdentity"]
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_account}/${var.repository}:ref:refs/heads/main"]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "nuxt3_blog_deploy_role" {
  name               = "nuxt3_blog_deploy_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "aws_iam_policy_document" "blog_contents_access" {
  statement {
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:ListBucket",
      "s3:DeleteObject"
    ]
    resources = [
      "arn:aws:s3:::${aws_s3_bucket.nuxt_blog.id}",
      "arn:aws:s3:::${aws_s3_bucket.nuxt_blog.id}/*"
    ]
  }
}

resource "aws_iam_policy" "blog_contents_access" {
  name   = "s3_nuxt3_blog_contents_access"
  policy = data.aws_iam_policy_document.blog_contents_access.json
}

resource "aws_iam_role_policy_attachment" "default" {
  role       = aws_iam_role.nuxt3_blog_deploy_role.name
  policy_arn = aws_iam_policy.blog_contents_access.arn
}
