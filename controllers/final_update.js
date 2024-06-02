const db = require("../routes/db-config");

const final_update = (req, res) => {
    const id_data = req.body.hidden_id;
    const name_data = req.body.name;
    const email_data = req.body.email;
    const feed_data = req.body.feed;

    console.log("id...", req.body.name, id_data);
    const updateQuery = "UPDATE feedback SET name=?, email=?, feedback=? WHERE id=?";
    // No need for try...catch block here since db.query already handles errors with a callback function
    db.query(
        updateQuery,
        [name_data, email_data, feed_data, id_data],
        (err, result) => {
            if (err) {
                console.error("Error updating feedback:", err);
                res.send(err); // Send the error response to the client
            } else {
                console.log("Feedback updated successfully");
                res.redirect("/data");
            }
        }
    );
};

module.exports = final_update;
