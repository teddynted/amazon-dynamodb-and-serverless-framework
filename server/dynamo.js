const AWS = require("aws-sdk");
const { IS_OFFLINE } = process.env;

if( IS_OFFLINE ) {
    AWS.config.update({
        region: "us-east-1",
        endpoint: "http://localhost:8000"
    });
}

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const postsModel = require("./postsModel");

exports.getPosts = () => {
    return new Promise( async (resolve, revoke) => {
        const params = {
            TableName: postsModel.params.TableName,
        }
        dynamoDb.scan(params, (err, data) => {
            if (err) {
                revoke(err.message);
            } else {
                if( data.Items ) {
                    resolve(data.Items);
                } else {
                    resolve([]);
                }
            }
        });  
    });
};