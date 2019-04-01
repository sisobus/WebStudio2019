if [ "$#" -ne 2 ]; then
  echo "Usage: ./this_script.sh <dictionary> <URI>" 
  echo "Example: ./user_create.sh '{\"email\": \"sisobus3@vuno.co\", \"password\": \"1234qwer\"}' 0.0.0.0:5000/api/users"
  exit 1
fi
curl -X PUT -H "Content-Type: application/json" -d "$1" "$2"
