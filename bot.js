const Discord = require("discord.js");
const ms = require("ms");
const fs = require('fs');
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');
const r1 = require('snekfetch');
const jimp = require('jimp')
const math = require('math-expression-evaluator'); 
const child_process = require("child_process");
const Canvas = require('canvas');
var prefix = "/"
const client = new Discord.Client();
const agree = "✅";
const disagree = "❌";

const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {

    var channelxd;
    setInterval(() => {
        client.user.setGame(`GBot on ${client.guilds.size} Servers`,'https://www.twitch.tv/gbot');
    }, 5000);

  console.log(' GBot Is Online')
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
  
});

let cooldown = new Set();
let sec = 60;
var ticketc = 0000;

client.on('guildMemberAdd', async member => {
	member.guild.roles.find(role => role.name === "| CF | Member");
	const channel = member.guild.channels.find(ch => ch.name === 'welcome');
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/515879836309520403/515882876605169665/wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvas.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'https://cdn.discordapp.com/attachments/515879836309520403/515882914869805056/Welcome.png');

	channel.send(`Welcome To CrossFire, ${member}!`, attachment);
});
client.on('message', async message => {
	    let args = message.content.split(' ').slice(1).join(' ');
    
      
     if (message.content.startsWith(prefix + "clear")) {
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('⚠ | **ليس لديك صلاحيات**');
        var msg;
        msg = parseInt();
     
      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "Done | تــم",
        color: 0x06DF00,
        description: "تم مسح الرسائل بنجاح",
        footer: {
          text: "Name Bot."
        }
      }}).then(msg => {msg.delete(3000)});
                          }
 

	
if (message.content.startsWith(prefix + "new")) {

                        if(cooldown.has(message.author.id)){
        message.delete();
        message.channel.send(`عليك ان تنتظر 1 دقيقة لأنشاء تذكرة مرة اخرى`).then((mxd) => {
		        mxd.delete(5000);
	});
        message.delete();
    }else{
        const reason = message.content.split(" ").slice(1).join(" ");   
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);   
        message.guild.createChannel(`ticket-${ticketc}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });  
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
          
	message.channel.send(`:white_check_mark: **تم إنشاء تذكرتك ، #${c.name}.**`);
        if(!reason){
		const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
	  	.addField(`Created By : ` , `${message.author.username}`)
                .addField(`مرحباّ ${message.author.username}!`, `يرجي شرح سبب فتح هذا التذكرة . سيكون فريق الدعم لدينا قريبا للمساعدة`)
                .addField(`Subject :` , `None`)
	    	.setTimestamp();
            c.send({
                embed: embed
            });
	}else {
				const embedd = new Discord.RichEmbed()
                .setColor(0xCF40FA)
	  	.addField(`Created By : ` , `${message.author.username}`)
                .addField(`مرحباّ ${message.author.username}!`, `يرجي شرح سبب فتح هذا التذكرة . سيكون فريق الدعم لدينا قريبا للمساعدة`)
                .addField(`Subject :` , `${reason}`)
	    	.setTimestamp();
            c.send({
                embed: embedd
            });
	}
            ticketc++;
		    cooldown.add(message.author.id);
    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, sec * 1000);
      

    })
}
}

	
if(message.content.startsWith(prefix + "ban")){
if(!message.member.hasPermission("BAN_MEMBERS")){
	message.channel.send(`**BAN_MEMBERS : ليس لديك صلاحية  ** `);

}else {
  let mban = message.mentions.members.first();
  let reason = args.slice(1).join(" ");
if(!mban) {
  message.channel.send(`** منشن الشخص **`).then((metionm) => {
    metionm.delete(5000);
  });
}else if(!reason){
  message.channel.send(`** اكتب السبب**`).then((metionm2) => {
    metionm2.delete(5000);
  });


}else {
  message.channel.send(`** ${mban} , Banned from ${message.guild.name} server :airplane: **`).then((banm) => {
    banm.delete(5000);
  });
  message.guild.member(mban).ban(7, mban);
}
}
}
	

if (message.content.startsWith(prefix + "close")) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

    message.channel.send(`هل أنت متأكد؟ بعد التأكيد ، لا يمكنك عكس هذا الإجراء!\n للتأكيد ، اكتب\`^close\`. سيؤدي ذلك إلى مهلة زمنية في غضون 10 ثوان وإلغائها`)
        .then((m) => {
            message.channel.awaitMessages(response => response.content === '^close', {
                    max: 1,
                    time: 10000,
                    errors: ['time'],
                })   
                .then((collected) => {
                    message.channel.delete();
                })  
                .catch(() => {
                    m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                        m2.delete();
                    }, 3000);
                });
        });
}





	
   let embed = new Discord.RichEmbed()


    let args1 = message.content.split(' ').slice(1).join(' ');


     if(!message.channel.guild) return;

	
	
     if (message.content.startsWith(prefix + "bc")) {
	             if(!message.member.hasPermission("ADMINISTRATOR")){
        message.delete
              message.channel.send(`**ليس لديك صلاحية**`);
              message.delete();
    
        }else if(!args[1]){

                 message.channel.send(`**اكتب كلمة او جملة**`);
    
    
    
                 message.delete();
    
        }else{
    
    
            message.channel.send(` ** هل أنت متأكد من أرسالك الرسالة الى جميع الأعضاء؟ \n ` + args1 + ` : محتوى الرسالة **` )
            .then(function (msg){
        
		 msg.react(agree)
                            .then(() => msg.react(disagree));
            let reactionaFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let reactiondFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                      
        
            let reactiona = msg.createReactionCollector(reactionaFilter, { time: 12000 });
            let reactiond = msg.createReactionCollector(reactiondFilter, { time: 12000 });
            reactiona.on("collect", r => {
    
                message.delete(5000);
                msg.delete(5000);
         
                let embed = new Discord.RichEmbed()
                .setColor("#FF00FF")
                .setThumbnail(message.author.avatarURL)  
                                                  .addField(agree + ' | تم الارسال بواسطة ', "<@" + message.author.id + ">")
						.addField(`عدد الأعضاء المرسل لهم` , `${member.guild.memberCount}`)
                             message.channel.sendEmbed(embed).then((m3) => {
				    m3.delete(5000);
			     });
                    message.guild.members.forEach(m => {
                        var bc = new Discord.RichEmbed()
			 .setThumbnail(message.author.avatarURL)  
                        .addField('**● Sender  :**', `*** → ${message.author.username}#${message.author.discriminator}***`)
                        .addField('***● Server  :***', `*** → `+ message.guild.name +` ***`)               
                .setColor('#ff0000')
                             .addField('***● Message  :***  ', "→ " + args1)
                        m.send(``,{embed: bc});
                        message.delete(5000);
                        msg.delete(5000);
			msg.delete(5000);
                        
	    });
            })
            reactiond.on("collect", r => {
                message.delete();
                msg.delete();
                message.channel.send("** ❌ تم الألغاء **").then((m4) => {
				     m4.delete(5000);
			     });
                message.delete();
                msg.delete();
		                msg.delete(5000);
            })
        
            })       
    
        }
    
    
            
        
                
    
    
        }
    
        
     



    if(message.content.startsWith(prefix + "help")){
        message.channel.send(agree);
        message.author.send(`
        ╭━━━╮╱╱╱╱╱╱╱╱╱╱╭━━━╮
        ┃╭━╮┃╱╱╱╱╱╱╱╱╱╱┃╭━━╯
        ┃┃╱╰╋━┳━━┳━━┳━━┫╰━━┳┳━┳━━╮
        ┃┃╱╭┫╭┫╭╮┃━━┫━━┫╭━━╋┫╭┫┃━┫
        ┃╰━╯┃┃┃╰╯┣━━┣━━┃┃╱╱┃┃┃┃┃━┫
        ╰━━━┻╯╰━━┻━━┻━━┻╯╱╱╰┻╯╰━━╯
        
      **Soon, our bot will be translated to English**

      **  ⦁~~                                     ~~⦁**

        **  العامةالأدراية**

        **/bc** ارسال رسالة الى جميع الأعضاء .
        **/ban** لحظر شخص من السيرفر لمدة 7 ايام .
        **/new** لأنشاء تذكرة في السيرفر .
        **/close** لإغلاق التذكرة .
        **/clear** للـحذف الشات .
     
        
        
        `);
    }

    if(message.content.startsWith(prefix + "ping")){

        if(!message.member.hasPermission("ADMINISTRATOR")){

              message.channel.send(`ليس لديك صلاحية`);
              message.delete;


        }else{
   
                    message.channel.send(client.ping + ` : سرعة البوت هي  `);
        }
    }

 
	
    

})

client.login(process.env.BOT_TOKEN);
