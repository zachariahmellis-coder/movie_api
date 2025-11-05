# 🎬 Movie API

A simple Node.js web server project built for **CareerFoundry – Achievement 2**.  
This project demonstrates using Node’s built-in **http**, **url**, and **fs** modules to:

- Serve different HTML pages based on the request path (`/` and `/documentation`)
- Log incoming requests with timestamps into a `log.txt` file
- Handle unknown routes with a friendly 404 error message

---

## 🗂 Project Structure
```

movie_api/
├── documentation.html
├── index.html
├── log.txt
├── server.js
└── test.js

````

---

## ⚙️ How to Run
Step 1 Open your terminal and navigate to the project folder:
   ```bash
   cd ~/projects/movie_api
````

Step 2 Start the server:

   ```bash
   node server.js
   ```

Step 3 Open your browser and visit:

   * [http://localhost:8080](http://localhost:8080)
   * [http://localhost:8080/documentation](http://localhost:8080/documentation)

Step 4 Check your request logs:

   ```bash
   cat log.txt
   ```

---

## 💡 Future Improvements

* Add a custom `404.html` page
* Integrate Express.js for more routing features
* Add unit tests for route handling

---

**Created by:** Zachariah M. Ellis
*Evolving with purpose — building a limitless digital life.*

```
