import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "./environtment";

//khởi tạo 1 đối tượng là trelloMongoInstance là null vì đầu tiên chưa connect
let trelloMongoInstance = null;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  // Connect the client to the server (optional starting in v4.7)
  await mongoClient.connect();

  // Send a ping to confirm a successful connection
  trelloMongoInstance = mongoClient.db(env.DATABASE_NAME);
};

//đóng kết nối tới database khi cần
export const CLOSE_DB = async () => {
  await trelloMongoInstance.close();
};

// func này có tác dụng export ra trellloMongoInstance sau khi đã connect thành công tới mongodb để sử dụng ở nhiều nơi khác nhau
export const GET_DB = () => {
  if (!trelloMongoInstance) throw new Error("Must connect to mongo db");
  return trelloMongoInstance;
};
