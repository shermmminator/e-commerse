const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const initApp = require("./init_session");
// Create session init sequence here:
app.use(express.static('build'));
initApp(app);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

