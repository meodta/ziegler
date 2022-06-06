export

.PHONY: dev-build dev-start clean

DEV_DC = docker-compose -p ziegler_exercise_1 -f docker-compose.yml -f docker-compose.dev.yml --env-file .env

UID     := $(shell id -u)
GID     := $(shell id -g)

dev-build:
	UID=${UID} \
  GID=${GID} \
	$(DEV_DC) build

dev-start:
	UID=${UID} \
  GID=${GID} \
	$(DEV_DC) up --remove-orphans

clean:
	$(DEV_DC) stop
	$(PROD_DC) stop

