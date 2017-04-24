var gulp = {
    fns:[],
    task:function(taskname,fn){
        this.fns.push(fn);
    },
    run:function(){
        var index = 0;
        var self = this;
        function next(){
            if(index<self.fns.length){
                self.fns[index++](next);
            }
        }
        next();
    }
}

gulp.task('a',function(cb){
    setTimeout(function(){
        console.log('a');
        cb();
    },3000);
});
gulp.task('b',function(cb){
    setTimeout(function(){
        console.log('b');
        cb();
    },3000);
});
gulp.run();
