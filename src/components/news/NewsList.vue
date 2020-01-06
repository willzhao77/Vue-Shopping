<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="https://www.bp.com/etc/designs/refresh/bp/images/navigation/bp-logo.svg">
						<div class="mui-media-body">
							<h1>Lucky</h1>
							<p class='mui-ellipsis'>
                                <span>Time: 2012-12-12 12:12:12</span>
                                <span>Clicked: 0 Times</span>
                            </p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="https://www.bp.com/etc/designs/refresh/bp/images/navigation/bp-logo.svg">
						<div class="mui-media-body">
							<h1>Lucky</h1>
							<p class='mui-ellipsis'>
                                <span>Time: 2012-12-12 12:12:12</span>
                                <span>Clicked: 0 Times</span>
                            </p>
						</div>
					</a>
				</li>
                <li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="https://www.bp.com/etc/designs/refresh/bp/images/navigation/bp-logo.svg">
						<div class="mui-media-body">
							<h1>Lucky</h1>
							<p class='mui-ellipsis'>
                                <span>Time: 2012-12-12 12:12:12</span>
                                <span>Clicked: 0 Times</span>
                            </p>
						</div>
					</a>
				</li>

			</ul>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    methods:{
        getNewsList(){ //get news list
            //this.$http.get('')
        }
    }
    
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{
            font-size: 14px
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>