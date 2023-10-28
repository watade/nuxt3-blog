resource "aws_acm_certificate" "blog" {
  provider                  = aws.acm_provider
  domain_name               = var.blog_domain
  subject_alternative_names = []
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "default" {
  provider                = aws.acm_provider
  certificate_arn         = aws_acm_certificate.blog.arn
  validation_record_fqdns = [for record in aws_route53_record.certificate : record.fqdn]
}
