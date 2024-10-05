const fastify = require("fastify")({
  logger: true,
    //http2:true
});//root application instance

//should not use arrow function recommended by fastify
fastify.get('/ping', (req, res)=>{
    console.log(this)
    return "pong"
})

fastify.route({
    url:'/hello',
    method:"POST",
    handler: function (req, res){
        // directly supported fro text and json but not url-encoded url
        console.log(req.body)
        console.log(fastify);
        return "world"
    }
})

function samplePlugin(fastify, options, done){
    console.log("executing my plugins");
    fastify.decorate('key', 'value');
    console.log(fastify);
    done();

}

fastify.register(samplePlugin);

const PORT = 8080;
async function start() {
  try {
    
    await fastify.listen({ port: PORT });
    fastify.log.info(`Server is up on ${PORT}`);
    
  } catch (error) {
    console.log(error);
  }
}
start();
