const Discord = require('discord.js');
const Client = new Discord.Client(); 
const https = require('https');
const config = require('./config/config.json');
const fs = require('fs');

Client.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
Client.on("message", async message => {
    if(!message.guild && message.author.id === config.owner && message.attachments.size > 0)
    {
        var stringrray = "Your CDN link is: \n"
        try
        {
            var Attachment = (message.attachments).array(); 
            Attachment.forEach(function(attachment) {
                var filename = attachment.name; 
                while(fs.existsSync("/home/justiceserv/public_html/file.personal.pluxcon.network/" + filename))
                {
                    var re = /(?:\.([^.]+))?$/;
                    var ext = re.exec("file.name.with.dots.txt")[1];
                    var ext1 = re.exec("file.name.with.dots.txt")[0];
                    filename = ext1 +  "_1." + ext; 
                }
                var file = fs.createWriteStream("/home/justiceserv/public_html/file.personal.pluxcon.network/" + filename);
                var request = https.get(attachment.url, function(response){
                    response.pipe(file); 
                    stringrray += `${config.finalurl} + ${filename}`;
                });
            });
            setTimeout(() => {
                var successembed = new Discord.MessageEmbed()
                    .setColor("#40ff60")
                    .setTitle("Upload Successful!")
                    .setDescription(`${stringrray}`)
                    .setTimestamp()
                    .setFooter("UploaderBot made by Justiceserv#0001")
                message.channel.send(successembed); 
                console.log(Attachment); 
            }, 1000 * 10);
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
console.log("Successfully logged in.");