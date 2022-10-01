from concurrent.futures import thread
import subprocess, os

# get ip
ip = subprocess.getoutput("ipconfig getifaddr en0;")
file = open("src/constants/baseurl.txt", "w")
file.write(f"http://{ip}:7777")
file.close()

'''client = subprocess.getoutput("lt --port 3000 --subdomain mochis-client")
print(client)
server = subprocess.getoutput("lt --port 7777 --subdomain mochis-server")
print(server)'''

# launch server
eServer = subprocess.getoutput("lsof -nP -iTCP -sTCP:LISTEN | grep 7777")
#java      76690  ace   67u  IPv6 0x51970c3f7b40a0e7      0t0  TCP *:7777 (LISTEN)
pId = ""
if (len(eServer) > 0):
    tokens = eServer.split(" ")
    
    for token in tokens[1:]:
        if pId != token:
            pId = token
            break
    os.system(f"kill -9 {pId}")
    print(f"killed : {pId}")
os.system("cd ~/git/mochis-api; mvn spring-boot:run &")

# launch client
subprocess.getoutput("cd ~/git/mochis-client; npm start;")