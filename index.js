Sess = {};

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
    
    VK.init({
        apiId: 6209400
    });
    VK.Widgets.Auth("vk_auth", {
        width: 200,
        onAuth: function(data) {
            $("#vk_data p").text("Logged on as " + data.first_name + " " + data.last_name);
            $("#vk_data img").attr("src", data.photo_rec);
            //console.log(data);
            Sess.login = data;
            $("#vk_auth").hide("slide");
            $("#vk_data").show("slide", {direction: "right"});
        }
    });
    
    $("#event_url").change(function() {
        var url = $(this).val();
        VK.Api.call("groups.getById", {group_id: url, fields: "city"}, function(data) {
            if (!data.response) {
                alert("error!");
                console.log(data);
            } else {
                data = data.response[0];
                console.log(data);
                $("#event_name").val(data.name);
                if (data.city != 0) {
                    VK.Api.call("database.getCitiesById", {city_ids: data.city}, function(d) {
                        if (!d.response) {
                            alert("error");
                            console.log(d);
                        } else {
                            data.city_name = d.response[0].name;
                            $("#event_city").val(data.city_name);
                        }
                    });
                }
            }
        })
    });
});
