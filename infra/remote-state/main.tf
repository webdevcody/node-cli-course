terraform {
 required_providers {
   aws = {
     source  = "hashicorp/aws"
     version = "4.53.0"
   }
 }
}

provider "aws" {
 region = "us-east-1"
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "digi-drop-terraform-state"
     
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terraform_state" {
    bucket = aws_s3_bucket.terraform_state.id

    versioning_configuration {
      status = "Enabled"
    }
}

resource "aws_dynamodb_table" "terraform_state_lock" {
  name           = "wdc-digi-drop-state"
  billing_mode = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}