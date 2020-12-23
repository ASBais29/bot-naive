require('dotenv').config();
const{Client}=require('Discord.js')
const botcode = process.env.DISCORD_BOT_TOKEN

const client=new Client({
  partialS:['MEMBER','REACTION']
}) //instance of class client
client.on('message',async (message)=>{
    console.log(message.author.tag+': '+message.content)
    if(message.content==='Hello')
    {
      message.reply(`Hello`)
    }
    if(message.content.startsWith('$')){
        const [cmdName,...args]=message.content.trim().substring(1).split(/\s+/)
        console.log(...args)
        console.log(args)
        if(cmdName==='kick')
        {
            if(args.length===0)
             return message.reply('Please provide an ID')
            const member=message.guild.members.cache.get(args[0])
            if(!message.member.hasPermission('KICK_MEMBERS'))
            {
              return message.reply('You do not have permission to use that command')
            }
            if(member)
              member.kick().then((member)=>message.channel.send(`${member} is kicked`))
              .catch((err)=>message.channel.send('You do not have permission'))
            else
            {
                message.channel.send('This member is not found')
            }
        }
        if(cmdName==='ban')
        {
            if(args.length===0)
             return message.reply('Please provide an ID')
                      
            if(!message.member.hasPermission('BAN_MEMBERS'))
            {
              return message.reply('You do not have permission to use that command')
            }
            await message.guild.members.ban(args[0]).catch((err)=>console.log(err))
        }
    }
})

client.on('messageReactionAdd', (reaction,user)=>{
  const {name}=reaction.emoji
  const member= reaction.message.guild.members.cache.get(user.id)
if(reaction.message.id==='791388645520179320')
{
  switch(name){
    case '🍎' :
      member.roles.add('791388101423136798')
      break
    case ':🍑' :
      member.roles.add('791388121760530453')  
      break
  }
}


})


client.login(botcode)
