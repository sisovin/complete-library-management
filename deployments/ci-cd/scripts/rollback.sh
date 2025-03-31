#!/bin/bash

# Rollback script for deployment

# Function to display usage
usage() {
  echo "Usage: $0 <deployment_name> <namespace>"
  exit 1
}

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
  usage
fi

DEPLOYMENT_NAME=$1
NAMESPACE=$2

# Rollback the deployment
kubectl rollout undo deployment/$DEPLOYMENT_NAME -n $NAMESPACE

# Check the status of the rollback
kubectl rollout status deployment/$DEPLOYMENT_NAME -n $NAMESPACE
