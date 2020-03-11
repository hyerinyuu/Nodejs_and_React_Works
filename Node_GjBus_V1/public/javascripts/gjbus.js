$(function(){
    $(".bus_tr").click(function(){
        let id = $(this).data('id')
        // alert(id)

        $.ajax({
            url : "/gjbus/bustime",
            data : {id:id},
            success : function(result){
                $("#bustime").html(result)
            }
        })
    })
})                               