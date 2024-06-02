const db = require("../routes/db-config");


const user_update = (req, res) => {
    const id_data = req.body.hidden_id;
    const name_data = req.body.name;
    const email_data = req.body.email;
    const phn_data = req.body.phn;
    const sub_data = req.body.sub;
    const bio_data = req.body.bio;
    
    console.log("id...", req.body.name, id_data);
    
    // Update query for name and email
    const updateQuery = "UPDATE registration SET Name=?, Email=? WHERE id=?";
    
    // Insert query for phone number
    const insertQuery = "UPDATE registration SET phoneNumber=?, sub=?, bio=? WHERE id=?";
    
    // Check if phone number is provided
    if (phn_data || sub_data || bio_data) {
        // Phone number is provided, update it along with name and email
        db.query(
            updateQuery,
            [name_data, email_data, id_data],
            (err, result) => {
                if (err) {
                    console.error("Error updating user:", err);
                    res.send(err);
                } else {
                    // Phone number should be inserted or updated
                    db.query(
                        insertQuery,
                        [phn_data, sub_data, bio_data, id_data],
                        (err, result) => {
                            if (err) {
                                console.error("Error inserting phone number:", err);
                                res.send(err);
                            } else {
                                console.log("User, phone number and sub  updated successfully");
                                res.redirect("/user");
                            }
                        }
                    );
                }
            }
        );
    } else {
        // Phone number is not provided, update only name and email
        db.query(
            updateQuery,
            [name_data, email_data, id_data],
            (err, result) => {
                if (err) {
                    console.error("Error updating user:", err);
                    res.send(err);
                } else {
                    console.log("User updated successfully");
                    res.redirect("/user");
                }
            }
        );
    }
};

module.exports = user_update;
