const Discord = require('discord.js');
const Client = new Discord.Client(); 
const https = require('https');
const config = require('./config/config.json');
const fs = require('fs');

Client.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
Client.on("message", async message => {
    const args = message.content.slice(config.prefix.length).split();
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
                    filename = "1_" + filename; 
                }
                var file = fs.createWriteStream("/home/justiceserv/public_html/file.personal.pluxcon.network/" + filename);
                var request = https.get(attachment.url, function(response){
                    response.pipe(file); 
                    stringrray += `${config.finalurl}${filename}`;
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
            }, 500 * 1);
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
    else if(args.startsWith(short))
    {
        try
        {
            var linktoshort = args.substring(5); 
            let request = require("request");
            let linkRequest = {
            destination: "linktoshort",
            domain: { fullName: "short.sinsa.dev" }
            //, slashtag: "A_NEW_SLASHTAG"
            , title: "Shorted By UploaderBot"
            }

            let requestHeaders = {
            "Content-Type": "application/json",
            "apikey": `${config.rebrandlyapi}`,
            "workspace": "Main Workspace"
            }

            request({
                uri: "https://api.rebrandly.com/v1/links",
                method: "POST",
                body: JSON.stringify(linkRequest),
                headers: requestHeaders
            }, (err, response, body) => {
            let link = JSON.parse(body);
            setTimeout(() => {
                var successembed = new Discord.MessageEmbed()
                    .setColor("#54f542")
                    .setTitle("URL Shorten Successful")
                    .setDescription(`${link.destination} was shortened to ${link.shortUrl}`)
                    .setTimestamp()
                    .setFooter("UploaderBot made by Justiceserv#0001")
                message.channel.send(successembed); 
                console.log(`${link.destination} shortened.`);
            }, 500 * 1);
            });
        } catch(error)
        {
            console.log(error);
        }
        
    }
});
Client.login(config.token); 
console.log("Successfully logged in.");