const redis = require('redis')

const redisClient = redis.createClient({
    url: 'redis://default:QidLNTtafbKcy02BnfUZq2rnKNVbfVIM@redis-14766.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:14766'
});

const connectRedis = async () => {
    try {
      await redisClient.connect();
      console.log('Redis client connected...');
      
    } catch (err: any) {
      console.log(err.message);
      setTimeout(connectRedis, 5000);
    }
  };
  
  connectRedis();
  
  redisClient.on('error', (err) => console.log(err));
  
  export default redisClient;