import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const users = [
  {
    Username: "maxalpha",
    Password: "Test123!",
    Email: "maxalpha@example.com",
    Birthday: new Date("1988-09-10"),
    FavoriteMovies: [
      new ObjectId("6965a27924b6dcb2644ce2ed"),
      new ObjectId("6965a27924b6dcb2644ce2ee")
    ]
  },
  {
    Username: "neo_runner",
    Password: "Test123!",
    Email: "neo_runner@example.com",
    Birthday: new Date("1990-03-22"),
    FavoriteMovies: [new ObjectId("6965a27924b6dcb2644ce2ef")]
  },
  {
    Username: "thrillerhound",
    Password: "Test123!",
    Email: "thrillerhound@example.com",
    Birthday: new Date("1985-02-19"),
    FavoriteMovies: [new ObjectId("6965a27924b6dcb2644ce2ee")]
  },
  {
    Username: "scifisage",
    Password: "Test123!",
    Email: "scifisage@example.com",
    Birthday: new Date("1994-11-05"),
    FavoriteMovies: [new ObjectId("6965a27924b6dcb2644ce2ef")]
  },
  {
    Username: "delete_me",
    Password: "Test123!",
    Email: "delete_me@example.com",
    Birthday: new Date("1999-01-01"),
    FavoriteMovies: []
  }
];

async function seedUsers() {
  try {
    await client.connect();
    const db = client.db("myflixDB");

    await db.collection("users").deleteMany({});
    const result = await db.collection("users").insertMany(users);

    console.log(`✅ Inserted ${result.insertedCount} users`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

seedUsers();

