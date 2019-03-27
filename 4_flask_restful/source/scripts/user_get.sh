if [ "$#" -ne 1 ]; then
  echo "Usage: ./this_script.sh <URI>" 
  echo "Example: ./user_create.sh 0.0.0.0:5000/api/users"
  exit 1
fi
curl "$1"
