# Burgerino vs Nyan Cat #
Play as Burgerino to evade the famished Nyan Cats.\
Try it now: https://relaxed-williams-b01bbd.netlify.app/


### Project description ###
This project is as strictly front-end project built from scratch. It is mobile and desktop friendly with responsive design. Every thing is cleanly built and features can be added easily and maintainable.


### Notable technologies ###
React, Webpack, Sass

#### React ####
Well, React is "React". But, this game is built to have players easily adjust the parameters. For that to happen the app has to be structured smartly.

#### Webpack ####
The webpack configuration is completely custom built from scratch for this project. To name a few, it features code splitting, lazy loading, file compression, css optimization/injection.

#### Sass/Css ####
This is where the magic of responsiveness happens. With the custom webpack configuration it is possible to have injected Sass into component tags.

### Note on game development ###
I know this game does not particularly call for game UX/UI design, but that has always peeked my interest as I have worked as a play tester.

#### Example 1 ####
**Problem**: Notice how the Nyan Cat has a rainbow following it. Originally there was a hitbox on it, but it proved frustrating to our play testers.\
**Reason**: The rainbow has a fadded opacity design which gives out a feeling that the rainbow is **NOT** "part" of the Nyan Cat.\
**Solution**: Remove the hitbox instead of solidifying the rainbow since it will make the game easier and prettier.

### Play locally ###

1. Clone the repository
```
git clone <repo>
```

2. Install the dependencies
```
cd Nyan-Cat-React && npm install
```

3. Play (run development server)
```
npm start
```

Alt 3. Run the production build and open dist/index.html
```
npm run build
```

Easiest way: just use the link.
https://relaxed-williams-b01bbd.netlify.app/
