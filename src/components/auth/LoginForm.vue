<template>
  <el-form ref="form" label-width="70px">
    <el-form-item label="Email">
      <el-input placeholder="Enter your email.."></el-input>
    </el-form-item>
    <el-form-item label="Password">
      <el-input placeholder="Enter a password.."></el-input>
    </el-form-item>
    <div class="flex justify-end">
      <el-button type="primary">Login</el-button>
    </div>
    <div class="p-2">
      <p class="text-gray-400 text-center">
        Don't have an account yet? 
        <router-link to="/auth/register">
          <span class="text-blue-400 hover:underline">
            Register Now!
          </span>
        </router-link>
      </p>
    </div>
  </el-form>
</template>

