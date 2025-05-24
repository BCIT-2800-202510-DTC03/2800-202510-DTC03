# BloomGreener
BloomGreener is an application designed to encourage eco-friendly habits by providing users with tips, reminders, and the ability to track personalized green tasks. This promotes consistent sustainable behaviour through an educating way. Our app inspires users to create a long-lasting impact through simple, everyday actions.

## Technology used
### Frontend
>HTML  
>CSS  
>JavaScript  
### Backend
>Node.js  
>ExpressJS
### Database
> MongoDB
### APIs
> OpenWeather API 
>- 
>- Used for fetching weather at the users location.
>- Weather information is used for displaying weather, relative to the user's location, in the user's garden.


> Google Gemini
>-
>- Used to generate tasks based on the user's goal.
>- User can generate and add AI tasks to their daily task list.

## File Contents
```
root/
├── .env
├── .gitignore
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
├── backend/
│   ├── .gitignore
│   ├── API.js
│   ├── db.js
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── models/
│   │   ├── Decoration.js
│   │   ├── Garden.js
│   │   ├── Inventory.js
│   │   ├── Notification.js
│   │   ├── Plant.js
│   │   ├── PreMadeTask.js
│   │   ├── Rewards.js
│   │   ├── Task.js
│   │   ├── User.js
│   │   └── UserTasks.js
│   └── routes/
│       ├── aiTask.js
│       ├── error.js
│       ├── garden.js
│       ├── settings.js
│       ├── tasks.js
│       ├── user.js
│       └── userTasks.js
├── frontend/
│   ├── 404.html
│   ├── util.js
│   ├── assets/
│   │   ├── error/
│   │   │   └── plant-wilted.png
│   │   ├── garden/
│   │   │   ├── background-clear.png
│   │   │   ├── background-rain.png
│   │   │   ├── background-snow.png
│   │   │   ├── building-tent-blue.png
│   │   │   ├── building-tent-pink.png
│   │   │   ├── building-tent-yellow.png
│   │   │   ├── fence-black.png
│   │   │   ├── fence-blue.png
│   │   │   ├── fence-brown.png
│   │   │   ├── fence-pink.png
│   │   │   ├── fence-white.png
│   │   │   ├── ground.png
│   │   │   ├── object-birdbath.png
│   │   │   ├── object-stool-black.png
│   │   │   ├── object-stool-blue.png
│   │   │   ├── object-stool-brown.png
│   │   │   ├── object-stool-pink.png
│   │   │   ├── object-stool-white.png
│   │   │   ├── plant-tulip-orange.png
│   │   │   ├── plant-tulip-pink.png
│   │   │   ├── plant-tulip-purple.png
│   │   │   ├── plant-tulip-white.png
│   │   │   ├── plant-tulip-yellow.png
│   │   │   ├── shelf-black.png
│   │   │   ├── shelf-blue.png
│   │   │   ├── shelf-brown.png
│   │   │   ├── shelf-pink.png
│   │   │   └── shelf-white.png
│   │   ├── icons/
│   │   │   ├── add.svg
│   │   │   ├── addcircle.svg
│   │   │   ├── checkmark.svg
│   │   │   ├── filter.svg
│   │   │   ├── key.svg
│   │   │   ├── mail.svg
│   │   │   ├── placeholder.svg
│   │   │   └── wand.svg
│   │   ├── images/
│   │   │   ├── placeholder.svg
│   │   │   ├── Sticker_250509230055.png
│   │   │   ├── background/
│   │   │   │   ├── background-clear.png
│   │   │   │   ├── fence-white.png
│   │   │   │   ├── ground.png
│   │   │   │   ├── shelf-blue.png
│   │   │   │   ├── stool-pink.png
│   │   │   │   ├── tent-blue.png
│   │   │   │   ├── tulip-orange.png
│   │   │   │   └── tulip-yellow.png
│   │   │   └── screenshot/
│   │   │       ├── iPhone-13-PRO-localhost (1).png
│   │   │       ├── iPhone-13-PRO-localhost.png
│   │   │       └── Macbook-Air-localhost.png
│   │   ├── logos/
│   │   │   └── placeholder.svg
│   │   └── profile/
│   │       ├── avatar1.png
│   │       ├── avatar2.png
│   │       ├── avatar3.png
│   │       ├── avatar4.png
│   │       ├── avatar5.png
│   │       ├── avatar6.png
│   │       └── material_design_account_circle.svg
│   ├── div_components/
│   │   └── placeholder.html
│   ├── pages/
│   │   ├── about.html
│   │   ├── custom.html
│   │   ├── friends.html
│   │   ├── home.html
│   │   ├── landing.html
│   │   ├── login.html
│   │   ├── profile.html
│   │   ├── register.html
│   │   ├── settings.html
│   │   ├── shop.html
│   │   ├── template.html
│   │   └── weather.html
│   ├── text/
│   │   └── navbar.html
│   ├── scripts/
│   │   ├── AI.js
│   │   ├── config.js
│   │   ├── custom.js
│   │   ├── error.js
│   │   ├── friends.js
│   │   ├── garden.js
│   │   ├── home.js
│   │   ├── landing.js
│   │   ├── login.js
│   │   ├── navbar.js
│   │   ├── profile.js
│   │   ├── settings.js
│   │   ├── shop.js
│   │   ├── skeleton.js
│   │   ├── survey.js
│   │   ├── task.js
│   │   ├── userTasks.js
│   │   └── weather.js
│   ├── styles/
│   │   ├── custom.css
│   │   ├── error.css
│   │   ├── fonts.css
│   │   ├── friends.css
│   │   ├── garden.css
│   │   ├── home.css
│   │   ├── landing.css
│   │   ├── login.css
│   │   ├── navbar.css
│   │   ├── profile.css
│   │   ├── settings.css
│   │   ├── shop.css
│   │   ├── survey.css
│   │   └── task.css
│   └── weather/
│       ├── rain.css
│       ├── rain.js
│       └── snow.css
```


## How to use BloomGreener
Create an account and get started! Select your eco-goal and add tasks to your daily task list to get started. Complete tasks to earn sunpoints which can then be redeemed for decorations for your garden!
Customize your profile and add friends to ...

## About Us
We are DTC03 a group of 5 CST term 2, nightowls.
We built BloomGreener based on the theme "For a better tomorrow."
We consist of:
-   Pearly Li 
-   Kiara Cherry
-   Genevieve Glaim
-   Zoey Jiang
-   Kanon Nishiyama

## References & Credits

line 25-65 in scripts/settings.js references MDN contributors
from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch. See repo https://github.com/mdn/content/blob/main/files/en-us/web/api/fetch_api/using_fetch/index.md?plain=1 from lines 261-285. The following is in APA format.

MDN (2025). content. GitHub. https://github.com/mdn/content/blob/main/files/en-us/web/api/fetch_api/using_fetch/index.md?plain=1.

Weather.js line 60, frontend\weather\rain.css, and frontend\weather\rain.js all references https://codepen.io/arickle/pen/XKjMZY. A CSS and JavaScript rain animation by Aaron Rickle


Weather.js line 70, frontend\weather\snow.css references https://pajasevi.github.io/CSSnowflakes/. A CSS snow animation by PavelTheCoder.


## Contact Information
Run into any issues? Contact us at: [bloomgreenerreports@gmail.com](mailto:bloomgreenerreports@gmail.com)
