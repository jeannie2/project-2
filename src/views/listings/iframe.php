<!DOCTYPE html><html><?php echo file_get_contents($_REQUEST['url']); ?></html>
header('X-Frame-Options: ALLOW');
