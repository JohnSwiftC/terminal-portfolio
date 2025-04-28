export default function AboutMe() {
    return (
        <>
            <div className="flex flex-row bg-gray-900 text-gray-200 p-3 font-mono overflow-auto h-full whitespace-pre-wrap">
                <div className="basis-1/2 m-2">
                    <p>
                        Hi! I'm John Swift and I love having fun. Ever since I was seven I've been finding new and innovative ways to break shit. Whether it was cloning
                        fake credit card stealing batch files over the middle schools local network of lab computers or being an asshole with an ESP32 (before it was cool and everyone had their WalMart Flipper Zero),
                        I'm pretty sure I'm naturally inclined to what I do.
                    </p>
                    <br></br>
                    <p>
                        Being completely honest, I do three main things for fun: program, hang out with my friends, and play video games. Definitely a bum lifestyle to some but it has given me
                        a great edge in the space of my own goals. I've been programming since I knew what a computer was. I know Python, C, Rust, JavaScript, and Java well. I know Go less well, and C++ not at all. I have a hammer for every nail,
                        unless that nail is a fast, easy to develop, memory safe, and generally reliable piece of software. Anyone who claims to have a hammer for this nail is a liar.
                    </p>
                    <p className="text-xs italic">
                        It's actually Rust. 
                    </p>
                    <br></br>
                    <p>
                        Outside being a loser I have 2 dogs, Jake and Marco. Along with my dogs I have a girlfriend whose cat Gus is constantly fighting for my attention. And winning.
                        Wrestled all 4 years in highschool, made varsity in the latter 3, finishing up as team captain.
                    </p>
                    <br></br>
                    <p>
                        Also, if you're still playing along, go look at the cat command. Rumor has it the developer disabled every single compiler
                        security feature and also made the filename buffer only 16 bytes. Rumor also has it that a magic login function is at address ACAT ;)
                    </p>
                </div>
                <div className="basis-1/2 flex flex-cols justify-center m-2">
                    <div className="text-gray-300 font">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIMA39TPqxhUfseHOLjfSgZgyf-ws7TbGHQ-ooI4VrnxPOw7iWwWXN6VIcGskmVeb1jrU&usqp=CAU"></img>
                    </div>
                </div>
            </div>
        </>
    )
}