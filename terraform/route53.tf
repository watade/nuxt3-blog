variable "blog_domain" {}

data "aws_route53_zone" "blog" {
  name = var.blog_domain
}

resource "aws_route53_record" "blog" {
  zone_id = data.aws_route53_zone.blog.id
  name    = data.aws_route53_zone.blog.name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "certificate" {
  for_each = {
    for dvo in aws_acm_certificate.blog.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  zone_id = data.aws_route53_zone.blog.id
  name    = each.value.name
  records = [each.value.record]
  type    = each.value.type
  ttl     = 60
}

output "domain_name" {
  value = aws_route53_record.blog.name
}
