FROM node

LABEL maintainer Camilo Nieto <caenietoba@unal.edu.co>

# Set the work directory
WORKDIR /www/tradingsMicro

# Good to have stuff
RUN npm install pm2 -g
RUN npm install babel-cli -g

# Use Cache please
ADD package.json /www/tradingsMicro
RUN npm install

# Add application files
ADD . /www/tradingsMicro

COPY wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

RUN apt-get update && apt-get install -y dos2unix

# Entrypoint script
RUN cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

RUN dos2unix /usr/local/bin//docker-entrypoint.sh && apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/*

# Expose the port
EXPOSE 4005

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]


## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait