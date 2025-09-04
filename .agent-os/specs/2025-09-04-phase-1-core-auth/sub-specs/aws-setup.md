# AWS Infrastructure Setup

This document outlines the AWS CLI commands and configuration needed for Phase 1 implementation.

## AWS Cognito Setup

### User Pool Creation

```bash
# Create Cognito User Pool
aws cognito-idp create-user-pool \
  --pool-name "LexagHOA" \
  --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=true,RequireLowercase=true,RequireNumbers=true,RequireSymbols=false}" \
  --auto-verified-attributes email \
  --username-attributes email \
  --verification-message-template "DefaultEmailOption=CONFIRM_WITH_CODE" \
  --email-configuration "EmailSendingAccount=COGNITO_DEFAULT" \
  --mfa-configuration OFF \
  --user-pool-tags "Environment=dev,Project=lexag" \
  --region us-east-1

# Create User Pool Client
aws cognito-idp create-user-pool-client \
  --user-pool-id <USER_POOL_ID> \
  --client-name "lexag-web-client" \
  --no-generate-secret \
  --explicit-auth-flows ADMIN_NO_SRP_AUTH ALLOW_USER_SRP_AUTH ALLOW_REFRESH_TOKEN_AUTH \
  --supported-identity-providers COGNITO \
  --callback-urls "https://localhost:3000" "https://lexag-dev.amplifyapp.com" \
  --logout-urls "https://localhost:3000" "https://lexag-dev.amplifyapp.com" \
  --allowed-o-auth-flows code \
  --allowed-o-auth-scopes openid email profile \
  --allowed-o-auth-flows-user-pool-client \
  --region us-east-1
```

### User Groups Creation

```bash
# Create user groups for role-based access
aws cognito-idp create-group \
  --group-name "residents" \
  --user-pool-id <USER_POOL_ID> \
  --description "Tenants and residents" \
  --region us-east-1

aws cognito-idp create-group \
  --group-name "owners" \
  --user-pool-id <USER_POOL_ID> \
  --description "Property owners" \
  --region us-east-1

aws cognito-idp create-group \
  --group-name "board" \
  --user-pool-id <USER_POOL_ID> \
  --description "Board members" \
  --region us-east-1

aws cognito-idp create-group \
  --group-name "president" \
  --user-pool-id <USER_POOL_ID> \
  --description "Board president - full access" \
  --region us-east-1

aws cognito-idp create-group \
  --group-name "secretary" \
  --user-pool-id <USER_POOL_ID> \
  --description "Board secretary - user management" \
  --region us-east-1

aws cognito-idp create-group \
  --group-name "treasurer" \
  --user-pool-id <USER_POOL_ID> \
  --description "Board treasurer - billing access" \
  --region us-east-1

aws cognito-idp create-group \
  --group-name "media" \
  --user-pool-id <USER_POOL_ID> \
  --description "Board media - bulletin management" \
  --region us-east-1
```

## AWS RDS PostgreSQL Setup

```bash
# Create DB Subnet Group
aws rds create-db-subnet-group \
  --db-subnet-group-name lexag-db-subnet-group \
  --db-subnet-group-description "Subnet group for Lexag PostgreSQL database" \
  --subnet-ids <SUBNET_ID_1> <SUBNET_ID_2> \
  --tags Key=Environment,Value=dev Key=Project,Value=lexag \
  --region us-east-1

# Create PostgreSQL Database Instance
aws rds create-db-instance \
  --db-instance-identifier lexag-postgres-dev \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 15.4 \
  --master-username postgres \
  --master-user-password <SECURE_PASSWORD> \
  --allocated-storage 20 \
  --storage-type gp2 \
  --vpc-security-group-ids <SECURITY_GROUP_ID> \
  --db-subnet-group-name lexag-db-subnet-group \
  --backup-retention-period 7 \
  --storage-encrypted \
  --tags Key=Environment,Value=dev Key=Project,Value=lexag \
  --region us-east-1
```

## AWS AppSync GraphQL API

```bash
# Create AppSync GraphQL API
aws appsync create-graphql-api \
  --name "LexagHOA-API" \
  --authentication-type AMAZON_COGNITO_USER_POOLS \
  --user-pool-config "userPoolId=<USER_POOL_ID>,awsRegion=us-east-1,defaultAction=ALLOW" \
  --tags Environment=dev,Project=lexag \
  --region us-east-1

# Create Data Source for PostgreSQL
aws appsync create-data-source \
  --api-id <APPSYNC_API_ID> \
  --name "PostgreSQLDataSource" \
  --type RELATIONAL_DATABASE \
  --relational-database-config "relationalDatabaseSourceType=RDS_HTTP_ENDPOINT,rdsHttpEndpointConfig={awsRegion=us-east-1,dbClusterIdentifier=<RDS_CLUSTER_ARN>,databaseName=postgres,schema=public}" \
  --service-role-arn <APPSYNC_SERVICE_ROLE_ARN> \
  --region us-east-1
```

## Environment Variables File

Create `aws-config.env` in project root:

```bash
# AWS Cognito Configuration
REACT_APP_AWS_REGION=us-east-1
REACT_APP_USER_POOL_ID=<COGNITO_USER_POOL_ID>
REACT_APP_USER_POOL_WEB_CLIENT_ID=<COGNITO_CLIENT_ID>

# AWS AppSync Configuration  
REACT_APP_APPSYNC_GRAPHQL_ENDPOINT=<APPSYNC_ENDPOINT>
REACT_APP_APPSYNC_REGION=us-east-1
REACT_APP_APPSYNC_AUTHENTICATION_TYPE=AMAZON_COGNITO_USER_POOLS

# Database Configuration (for backend/Lambda functions)
DB_HOST=<RDS_ENDPOINT>
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<SECURE_PASSWORD>

# Application Configuration
REACT_APP_HOA_NAME="Lexington Commons HOA"
REACT_APP_ENVIRONMENT=development
```

## IAM Roles and Policies

### AppSync Service Role

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds-data:BeginTransaction",
        "rds-data:CommitTransaction",
        "rds-data:ExecuteStatement",
        "rds-data:RollbackTransaction"
      ],
      "Resource": "*"
    }
  ]
}
```

### Lambda Execution Role (for future use)

```json
{
  "Version": "2012-10-17", 
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream", 
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "rds:DescribeDBInstances",
        "rds-data:*"
      ],
      "Resource": "*"
    }
  ]
}
```

## Deployment Commands

```bash
# Deploy GraphQL Schema
aws appsync start-schema-creation \
  --api-id <APPSYNC_API_ID> \
  --definition file://schema.graphql \
  --region us-east-1

# Create Resolvers (after schema deployment)
aws appsync create-resolver \
  --api-id <APPSYNC_API_ID> \
  --type-name Query \
  --field-name listPublicBulletins \
  --data-source-name PostgreSQLDataSource \
  --request-mapping-template file://resolvers/listPublicBulletins-request.vtl \
  --response-mapping-template file://resolvers/listPublicBulletins-response.vtl \
  --region us-east-1
```

## Security Configuration

- **Database**: Encrypted at rest, VPC security groups restricting access
- **Cognito**: Email verification required, secure password policies
- **AppSync**: Cognito JWT authentication, field-level authorization
- **Network**: Private subnets for database, public subnets for AppSync endpoints

## Monitoring Setup

```bash
# CloudWatch Log Groups
aws logs create-log-group \
  --log-group-name "/aws/appsync/apis/<APPSYNC_API_ID>" \
  --region us-east-1

# CloudWatch Alarms
aws cloudwatch put-metric-alarm \
  --alarm-name "Lexag-API-ErrorRate" \
  --alarm-description "High error rate in GraphQL API" \
  --metric-name ErrorRate \
  --namespace AWS/AppSync \
  --statistic Average \
  --period 300 \
  --threshold 5 \
  --comparison-operator GreaterThanThreshold \
  --region us-east-1
```
