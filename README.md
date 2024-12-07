This is a backend for Truecaller.
it consits of functionalities such as, User registration and login it also consits the functionality to mark a number to be spam.
i.e  If the user is 100% sure that the number is a spam, then the user needs to pass it as a parameter, and if the user is not sure whether the number is a spam or not then the user will pass 50%.
Based on the percentage that the number is a spam, the number will be listed as a spam or otherwise as likely spam.

This will help other users to prevent themselves to accedentially share critical information to scammers.

We are using Sequelize and PostgresQL in this project, there are two different databases, 
1) Global db --> which consist's of all the contact number of the user, each number in here has a column regarding it's spam probability
2) User db --> it consist's of the user's contact detail and profile details.

Transactions will be implemented in the future to ensure data integrity and prevent redundancy.

Techstack: Node.js, Express.js, Sequelize, PostgresQL.
