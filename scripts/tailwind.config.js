module.exports = {
    content: ["./views/*.ejs", "./scripts/*.js"], // Includes Tailwind styling for any ejs or js file in these folders
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
};
