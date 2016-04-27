<?php

function config() {
    return  array(
        'asset_path' => 'src/',
        'wds_url' => 'http://localhost:8080/'
        // 'asset_path' => 'static/',
        // 'wds_url' => ''
    );
}

class Hash {
    private static $assets_hashmap = null;

    public static function get_assets_hashmap(){
        if (is_null(self::$assets_hashmap))
        {
            $hashmap_file = __DIR__ . '/' . config()['asset_path'] . 'assets-hash.json';
            if(file_exists($hashmap_file))
            {
                $assets_hashmap = json_decode(file_get_contents($hashmap_file), true);
            }
            else
            {
                $assets_hashmap = array();
            }
            self::$assets_hashmap = $assets_hashmap;
        }
        return self::$assets_hashmap;
    }
}

function asset($file) {
    if(!config()['wds_url'])
    {
        $hashmap = Hash::get_assets_hashmap();
        if (array_key_exists($file,  $hashmap))
        {
            $dotpos = strrpos($file, '.');
            $file = substr($file, 0, $dotpos) . '.' . $hashmap[$file] . substr($file, $dotpos - strlen($file));
        }
    }
    return config()['asset_path'] . $file;
}

// webpack dev server
function asset_wds($file) {
    if(config()['wds_url'])
    {
        return config()['wds_url'] . $file;
    }
    else
    {
        return asset($file);
    }
}

function asset_url() {
    if(config()['wds_url'])
    {
        return config()['wds_url'];
    }
    else
    {
        return config()['asset_path'];
    }
}

class Template {

    private $_scriptPath = __DIR__ ;

    public $properties;

    public function setScriptPath($scriptPath){
        $this->_scriptPath=$scriptPath;
    }

    public function __construct(){
        $this->properties = array();
    }

    public function render($filename){

        ob_start();

        if(file_exists($this->_scriptPath . $filename))
        {
            include($this->_scriptPath . $filename);
        }
        else
        {
            throw new Exception('view not exists');
        }

        return ob_get_clean();
    }

    public function __set($k, $v){
        $this->properties[$k] = $v;
    }

    public function __get($k){
        return $this->properties[$k];
    }

    public static function asset($fiel) {
        return $config['dev_asset_path'] . $file;
    }
}