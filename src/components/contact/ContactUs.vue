<template>
    <div>
        <form class="contactus">
            
            <div class="">
                <label>Name:</label>
                <input type="text" placeholder="" style="margin: 10px 0px;">
            </div>

            <div class="">
                <label>Email:</label>
                <input type="text" placeholder="" style="margin: 10px 0px;">
            </div>

            <label>Message:</label>
            <div class="mui-input-row" style="margin: 10px 0px;">
                        <textarea id="textarea" rows="5" placeholder=""></textarea>
            </div>

            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary" onclick="return false;">Send</button>&nbsp;&nbsp;
                <button type="button" class="mui-btn mui-btn-danger" onclick="return false;">Cancel</button>
            </div>
		</form>


    </div>
</template>

<script>

</script>


<style lang="scss" scoped>
    .contactus{
        margin: 20px 10px;
    }
</style>