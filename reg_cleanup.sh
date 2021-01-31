# get all images that start with localhost:32000, output the results into image_ls file
sudo microk8s ctr images ls name~='localhost:32000' | awk {'print $1'} > image_ls

# loop over file, remove each image
cat image_ls | while read line || [[ -n $line ]];
do
    microk8s ctr images rm $line
done;
