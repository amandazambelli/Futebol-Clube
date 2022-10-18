#!/bin/bash


#-----Códigos ANSI para cores no terminal-------

RED='\033[0;31m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NO_COLOR='\033[0m'

#-----Instalação trybe-publisher-------

CP_RESULT=$(sudo cp ./trybe-publisher /usr/local/bin && echo ok)
[[ "$CP_RESULT" != "ok" ]] && sudo mkdir /usr/local/bin && sudo cp ./trybe-publisher /usr/local/bin


#-----Instalação git-filter-repo-------

if ! [[ -x $(command -v git-filter-repo) ]];
then
    echo -e "${YELLOW}A dependência ${NO_COLOR}git-filter-repo${YELLOW} não está instalada."
    read -p "Você deseja executar o script de instalação do git-filter-repo? (S/n)" -n 1 -r
    if [[ $REPLY =~ ^[Nn]$ ]]
    then
        echo -e "${BR}${RED}A dependência ${NO_COLOR}git-filter-repo${RED} não foi instalada!"
        echo -e "${RED}Você precisa fazer essa instalação manualmente antes de executar o ${NO_COLOR}trybe-publisher${BR}"
    else
        echo -e "${NO_COLOR}"
        git clone git@github.com:newren/git-filter-repo.git
        sudo mv ./git-filter-repo/git-filter-repo /usr/local/bin && rm -rf ./git-filter-repo
        echo
        echo -e "${BR}${GREEN}Dependência ${NO_COLOR}git-filter-repo${GREEN} instalada com sucesso!"
    fi
fi

#-----Instalação auto-complete-------

SHELL_NAME=${SHELL##*\/}

if [[ $SHELL_NAME == "fish" ]]
then
  FISH_COMPLETIONS_PATH=$HOME/.config/fish/completions/trybe-publisher.fish
  
  CP_RESULT=$(cp ./auto-completion.fish $FISH_COMPLETIONS_PATH && echo ok)
  
  if [[ "$CP_RESULT" == "ok" ]]
  then
    fish -c source $FISH_COMPLETIONS_PATH
    echo -e "${GREEN}Arquivo de auto-complete para o shell fish instalado em ${NO_COLOR}${FISH_COMPLETIONS_PATH}"
  else
    echo -e "${RED}Falha na instalação do arquivo de auto-complete para o shell fish em ${NO_COLOR}${FISH_COMPLETIONS_PATH}"
    echo "A funcionalidade de auto-complete não funcionará neste shell."
    echo
    echo "O restante do fluxo deve funcionar,"
    echo -e "mas ${RED}avise alguém do time de instrução"
    echo -e "sobre essa mensagem de erro.${NO_COLOR}"
  fi
else
  BASH_COMP_DIR="/etc/bash-completion.d"
  if [[ ! -d $BASH_COMP_DIR ]] ; then
      sudo mkdir $BASH_COMP_DIR
  fi

  sudo cp ./auto-completion.sh $BASH_COMP_DIR/trybe-publisher

  source $BASH_COMP_DIR/trybe-publisher
  
  case "${SHELL_NAME}"
      in
          zsh) SHELL_CONFIG="$HOME/.zshrc";;
          bash) SHELL_CONFIG="$HOME/.bashrc";;
          csh) SHELL_CONFIG="$HOME/.cshrc";;
          tcsh) SHELL_CONFIG="$HOME/.tcshrc";;
          *) SHELL_CONFIG="not-found";;
  esac

  SOURCE_COMMENT='# Necessário para auto-complete do comando trybe-publisher'
  SOURCE_COMMAND="source ${BASH_COMP_DIR}/trybe-publisher"
  if [[ $SHELL_CONFIG == "not-found" ]]
  then 
      echo -e "${YELLOW}A funcionalidade de auto-complete"
      echo "não funcionará porque nenhum Shell" 
      echo "conhecido foi encontrado."
      echo
      echo "O restante do fluxo deve funcionar,"
      echo -e "mas ${RED}avise alguém do time de instrução"
      echo -e "sobre essa mensagem de erro.${NO_COLOR}"
  else
      if grep -Fxq "$SOURCE_COMMAND" $SHELL_CONFIG
      then
          echo -e "${GREEN}Comando para auto-complete encontrado em ${NO_COLOR}${SHELL_CONFIG}"
      else
          echo "Para o auto-complete funcionar corretamente, é necessário inserir a linha abaixo no arquivo de configuração do seu Shell."
          echo 
          echo -e "${CYAN}${SOURCE_COMMAND}${NO_COLOR}"
          echo 
          read -p "Você deseja inserir essa linha no arquivo '${SHELL_CONFIG}'? (S/n)" -n 1 -r
          [[ ! $REPLY =~ ^[Nn]$ ]] && echo -e "${CYAN}Linha adicionada ao arquivo ${GREEN}${SHELL_CONFIG}${NO_COLOR}!"

          echo $SOURCE_COMMENT >> $SHELL_CONFIG
          echo $SOURCE_COMMAND >> $SHELL_CONFIG
      fi
  fi
fi
echo 
echo -e "${GREEN}* * * * * * * * * * * * * * * * * *${NO_COLOR}"
echo "Instalação finalizada!"
echo -e "${GREEN}* * * * * * * * * * * * * * * * * *${NO_COLOR}"