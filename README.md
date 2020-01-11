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