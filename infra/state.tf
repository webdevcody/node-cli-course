terraform {
 backend "s3" {
   bucket         = "digi-drop-terraform-state"
   key            = "state/terraform.tfstate"
   region         = "us-east-1"
   dynamodb_table = "wdc-digi-drop-state"
 }
}
