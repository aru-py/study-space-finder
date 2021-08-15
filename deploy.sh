ng build --prod
aws s3 sync dist/studyspacefinder s3://study-space-finder --acl public-read --size-only

