const Discord = require('discord.js');
const Client = new Discord.Client(); 
const https = require('https');
const config = require('./config/config.json');

Client.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
Client.on("message", async message => {
    var DataArray = []; 
    if(!message.guild && message.author.id === config.owner && message.attachments.size > 0)
    {
        try
        {
            var Attachment = (message.attachments).array(); 
            Attachment.forEach(function(attachment) {
            var filename = attachment.filename; 
                var file = fs.createWriteStream("/home/justiceserv/public_html/file.personal.pluxcon.network/" + filename);
                var request = https.get(attachment.url, function(response){
                    response.pipe(file); 
                    DataArray.push(config.finalurl + filename); 
                });
            });
            var stringrray = "Your attachment CDN URL is: \n"; 
            for(var i = 0; i < DataArray.length; i++)
            {
                stringrray += DataArray[i] + "\n"; 
            }
            var successembed = new Discord.MessageEmbed()
                .setColor("")
                .setTitle("Upload Successful!")
                .setDescription(stringrray)
                .setTimestamp()
                .setFooter("UploaderBot made by Justiceserv#0001")
            message.channel.send(successembed); 
            console.log(Attachment); 
        }
        catch(Exception)
        {
            var failedembed = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle(":x: Upload failed! :x:")
                .setDescription("Upload failed by following Error: \n" + `${Exception}`)
                .setTimestamp()
                .setFooter("UploaderBot made by Justiceserv#0001")
            message.channel.send(failedembed); 
            console.log(Exception);
        }
    }
});
Client.login(config.token); 