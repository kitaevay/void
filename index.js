$(function(){
    $("#button").click(function() {
        var datetime = $("#event_datetime").val().split(" ");
        var date = datetime[0];
        var time = datetime[1];
        var text = $("#event_city").val() + " " + date + " ";
        var bands = $("#event_bands").val().split(",");
        for(var i = 0; i < bands.length; i++) {
            bands[i] = bands[i].trim();
            bands[i] = bands[i].toLocaleLowerCase();
            bands[i][0] = bands[i][0].toLocaleUpperCase();
        }
        //$("#event_bands").data("array", bands);
        text = text + bands.join(" / ") + " † ";
        text = text + $("#event_place").val() + " " + time + " " + $("#event_price").val() + " † ";
        text = text + $("#event_url").val();
        $("#output").text(text);
    });
});
