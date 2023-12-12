<template>
    <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex;">
        <div style="flex: 1;">
            <ElImage style="width: 100%;height: 100%;" fit="cover"
                src="https://cdn.bili33.top/gh/sosfei/figurebed/PicGo/wallhaven-k9emxd.png"></ElImage>
        </div>
        <div style="position: absolute; bottom: 30px;left: 30px;color: aliceblue;text-shadow: 0 0 10px black;">
            FeiBack</div>
        <div style="width: 400px;z-index: 1;">
            <RouterView v-slot="{ Component }">
                <Transition name="el-fade-in-linear" mode="out-in">
                    <component :is="Component"></component>
                </Transition>
            </RouterView>
        </div>
    </div>
</template>