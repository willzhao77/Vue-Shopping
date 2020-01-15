#This is a VUE shopping cart project



Home Page:
1. Header : used Header from Mint-UI
2. Tabbar:  used tabbar from MUI
    a. update icon. (copy css and ttf to project folder)
    b. add cart icon 'mui-icon mui-icon-extra mui-icon-extra-cart'
3. content area add router-view


update tabbar to router-link

# load pictures for slides.
1. use vue-resource
2. use vue-resource this.$http.get get slide info
3. save data
4. use v-for render slide item


update grid area


update News route

# create news page
1. create page  (use media-list from MUI)
2. use vue-resouce get data
3. render real data

# display news detail page
1. update each item to router-link.  use ID to identify the page
2. create component for detail page  NewsInfo.vue
3. create route

# create news detail page and render data

# create comment component "comment.vue" 
1. create comment.vue component template
2. manually import comment component when need this component
   + `import comment  from './comment.vue`'
3. regist comment component on 'components' 
4. create new name when regist sub component. and use this name on page

# get all comments and display


# show more comments
1. bind Click event for "more" button, request next page's data
2. click button "more", let pageIndex++, then use this.getComments() get new data
3. use "concat" method to add new comments. (keep old comments)

# create comments
1. two-way data bindings on textarea
2. bind click even for button
3. check comment content. if empty, "Toast" messasge and let user edit content.
4. use vue-resource send a request to server
5. if send comment success. Refresh comments, show new comment.
    + if use getComments methods. may only get the last page comment.
    + so, manually add the latest comment. Then, use unshit method add new data to comments.

# change Share button to route link and display related component

# create photo list,  component page, and related style
1. top nav bar
    + use tab-top-webview-main.html from MUI
    + remove mui-fullscreen Class
    + slide not working. Need JS component. 
        1. import mui.js
        2. check MUI website and init 
    + import mui.js. But receive error: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them. Webpack should use strict mode on bundle.js.
    + solution:
        1. install @babel/plugin-transform-modules-commonjs @babel/plugin-transform-strict-mode
        2. .babelrc add `["@babel/plugin-transform-modules-commonjs", { "strictMode": false }]`
    + top slide bar not working when enter from home page. should init slide after DOM load. So, move related code to "mounted"
    + at the bottom, the tabbar not working. because the sytel mui-tab-item conflict. rename this Class at App.vue and lib/mui/css/mui.css
    + render category list
# create photo list
    1. use lazy load. Use Mint-UI  component 'lazy-load'
    2. use lazy load document.
    3. set lazy load style.

# list picture to detail page
1. change li to router-link

# create picture detail page and render date.

# show preview picture
1. use vue-preview plugin
2. get all pictures list, use v-for render data
3. picture data should have w and h


# create shopping list page

# Test project on mobile device
1. Mobile and PC should be in same network. (mobile can visit PC IP)
2. In project, open package.json. At "dev" script, add --host. set --host value (PC IP)
