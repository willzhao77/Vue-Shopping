<template>
    <div>
        <h3>Test User</h3>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell"><img src="images\account.jpg" alt=""> Account: Test123</li>
            <li class="mui-table-view-cell">
                    <a class="mui-navigate-right"><img src="images\address.png" alt="">Address: 123 Test address</a>
            </li>

            <li class="mui-table-view-cell">
                    <a class="mui-navigate-right"><img src="images\mobile.jpg" alt=""> Mobile: 123456789</a>
            </li>
            <li class="mui-table-view-cell">
                    <a class="mui-navigate-right"><img src="images\order.png" alt=""> Order: 00001</a>
            </li>
            <li class="mui-table-view-cell">
                    <a class="mui-navigate-right"><img src="images\history.jpg" alt=""> Hisotry: None</a>
            </li>
            <li class="mui-table-view-cell"><img src="images\ver.jpg" alt=""> Version: 1.0</li>
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
h3{
    text-align: center;
    padding: 10px;
    color:#1668b5;
}
img{
    height: 30px;
}

ul{
    color: #404d48;
}
</style>