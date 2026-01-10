// za testiranje koristiti: https://ethereal.email/ besplatna je opcija, vidi se kako bi izgledao mail
// za login idu username i lozinka koji su u mailControlleru
const MailController = require("./mailController.js")
const mailComposition = require("../models/MailModel/mailComposition.js")

mailComposition.mailType = "wishlist"
mailComposition.from = "from@someone.td"
mailComposition.to = "to@someone.td"


MailController(mailComposition)


// workflow
// Uzmes iz modela mailComposition objekt koji sadrzi sva moguca polja u mailu
// popunis ih i posaljes mailControlleru
// mailController popuni mail template koji je zadan u modelsima ako ce biti vise vrsta mailova
// moze se na vise nacina mail definirati
// treba jos svakako dovrsit da to bude cjelina


