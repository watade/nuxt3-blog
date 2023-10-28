variable "access_key" {}
variable "secret_key" {}
variable "region" {}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.22.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}

provider "aws" {
  alias      = "acm_provider"
  access_key = var.access_key
  secret_key = var.secret_key
  region     = "us-east-1"
}
