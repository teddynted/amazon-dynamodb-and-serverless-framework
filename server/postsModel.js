const POSTS_TABLE = process.env.POSTS_TABLE;
const IS_OFFLINE = process.env.IS_OFFLINE;

const params = {
    TableName: POSTS_TABLE
};

const visible = ["postId", "post_title", "post_body"];

const transform = v => {
    console.log(v);
    return Object.keys(v)
        .filter(v => {
            return IS_OFFLINE ? true : visible.includes(v);
        })
        .reduce((obj, key) => {
            obj[key] = v[key];
            return obj;
        }, {});
};

module.exports = {
    params,
    visible,
    transform
};