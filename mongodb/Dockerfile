FROM mongo


RUN apt-get update \
    && apt-get install -y mongodb-clients \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /usr/src/app


COPY . .

EXPOSE 27017
