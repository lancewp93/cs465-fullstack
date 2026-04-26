# cs465-fullstack
CS-465 Full Stack Development with MEAN

Architecture:
For this project, I worked with multiple frontend approaches: Express-rendered HTML, client-side JavaScript, and a single-page application (SPA). Express HTML rendering is server-side, meaning each request generates a new page from the backend. This approach is straightforward and works well for simpler, multi-page applications, but it can feel slower because the page reloads on each request. The SPA admin site shifts most of the rendering to the client. Once the initial page loads, JavaScript dynamically updates the UI without full page reloads.

The backend uses a NoSQL MongoDB database because of its flexibility and scalability. Unlike relational databases, MongoDB stores data in JSON-like documents, which aligns well with JavaScript applications. It made it easier to model application data without fixed schemas and to quickly adapt as requirements evolved during development.


Functionality:
JSON differs from JavaScript in that it is purely a data format, not a programming language. While it resembles JavaScript Object syntax, it is used strictly for data exchange. JSON acts as the bridge between the frontend and backend by standardizing how data is sent and received through API requests.

During development, I refactored parts of the application to improve efficiency and reduce redundancy. One key improvement was the use of Handlebars as a templating engine. Instead of repeating the same HTML structure across multiple pages, I created reusable templates and partials. This allowed me to dynamically inject content into a shared layout rather than duplicating code.

Testing:
To test the API endpoints, I used Postman to send HTTP requests and verify responses. Postman allowed me to simulate client-side interactions by testing different request types, adding headers such as authentication tokens, and validating response data. This was especially useful for confirming that routes behaved correctly and returned the expected status codes and data structures.

I also used MongoDB Compass to directly inspect and manage the database. This tool made it easier to verify that data was being correctly stored, updated, and deleted in the MongoDB collections. By comparing the results from Postman requests with the actual database contents in MongoDB Compass, I could ensure that the backend logic was functioning as intended.


Reflection:
This course has significantly contributed to my professional development by giving me hands-on experience building a complete full stack application from start to finish. I gained a deeper understanding of how frontend and backend systems interact and how to design applications that are both functional and scalable.
