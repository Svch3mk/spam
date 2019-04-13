const Discord = require("discord.js");
const client = new Discord.Client();
const client2 = new Discord.Client();
const client3 = new Discord.Client();
const client4 = new Discord.Client();
const client5 = new Discord.Client();






client2.on('message', message => {
   if(!message.author.id == '442032455239860224') return
  let args = message.content.split(' ').slice(1).join(' ');
if(message.content.startsWith('-قول2')) {
   
 message.channel.send(args);  
}
});
client3.on('message', message => {
   if(!message.author.id == '442032455239860224') return
  let args = message.content.split(' ').slice(1).join(' ');
if(message.content.startsWith('-قول3')) {
   
 message.channel.send(args);  
}
});
client4.on('message', message => {
   if(!message.author.id == '442032455239860224') return
  let args = message.content.split(' ').slice(1).join(' ');
if(message.content.startsWith('-قول4')) {
   
 message.channel.send(args);  
}
});
client5.on('message', message => {
   if(!message.author.id == '442032455239860224') return
  let args = message.content.split(' ').slice(1).join(' ');
if(message.content.startsWith('-قول5')) {
   
 message.channel.send(args);  
}
});

client2.login(process.env.TOKEN2);
client3.login(process.env.TOKEN3);
client4.login(process.env.TOKEN4);
client5.login(process.env.TOKEN5);

